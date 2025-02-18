import React, { useEffect, useState } from 'react';
import { createStatView, SeriesType } from './AbstractStatView';
import Graph from 'react-graph-vis';
import { createGlobalStyle, styled } from 'styled-components';
import { DateCriteria, SeriesCriteria, UserCriteria } from './Criteria';

const GraphStyle = createGlobalStyle`
    div.vis-tooltip {
        position: absolute;
        color: black;
        border: 1px solid black;
        background-color: white;
    }
`;

const createItem = (acc, author) =>
    acc[author.user_no] ||
    (acc[author.user_no] = {
        user_no: author.user_no,
        name: author.name,
        relationship: {},
    });

const createRelationship = (acc, from, to) =>
    acc[from].relationship[to] ||
    (acc[from].relationship[to] = {
        user_no: to,
        comments: 0,
        mentions: 0,
    });

export const HubsizeCriteria = styled.fieldset.attrs(
    /**
     * @type {import('./Criteria').CriteriaElement}
     */ ({ $chartOptions = {}, $criteria = {}, $setCriteria = () => {}, $userList = [] }) => ({
        children: (
            <>
                <legend>관계도 옵션</legend>
                주로 대화하는 사용자 범위:{' '}
                <input
                    type="number"
                    min={0}
                    max={$userList.length}
                    value={$criteria.hubSize ?? 0}
                    onChange={(e) => {
                        $setCriteria({
                            ...$criteria,
                            hubSize: Number(e.target.value),
                        });
                    }}
                />
                명 이하의 사용자와 대화하는 사용자를 제외한 나머지
            </>
        ),
    })
)``;

/**
 * @type {import('./AbstractStatView').StatView}
 */
export const PeerMentions = createStatView(
    '사용자 간 멘션 횟수',
    '사용자끼리 댓글을 달거나 멘션한 횟수를 나타낸 관계도입니다',
    {
        extendXAxis: true,
        series: [
            {
                name: '댓글 횟수',
                type: SeriesType.Line,
                key: 'comments',
                stroke: '#ff7300',
                fill: '#ff7300',
                stackId: 1,
            },
            {
                name: '멘션 횟수',
                type: SeriesType.Line,
                key: 'mentions',
                stroke: '#8884d8',
                fill: '#8884d8',
                stackId: 1,
            },
        ],
        CriteriaElements: ({ $chartOptions = {}, $criteria = {}, $setCriteria = () => {}, $userList = [] }) => (
            <>
                <DateCriteria
                    $chartOptions={$chartOptions}
                    $criteria={$criteria}
                    $setCriteria={$setCriteria}
                    $userList={$userList}
                />
                <SeriesCriteria
                    $chartOptions={$chartOptions}
                    $criteria={$criteria}
                    $setCriteria={$setCriteria}
                    $userList={$userList}
                />
                <UserCriteria
                    $chartOptions={$chartOptions}
                    $criteria={$criteria}
                    $setCriteria={$setCriteria}
                    $userList={$userList}
                />
                <HubsizeCriteria
                    $chartOptions={$chartOptions}
                    $criteria={$criteria}
                    $setCriteria={$setCriteria}
                    $userList={$userList}
                />
            </>
        ),
        ChartElement: ({ $chartData, $chartOptions, $criteria }) => {
            const graph = {
                nodes: $chartData.map((item) => ({
                    id: item.user_no,
                    label: item.name,
                    title: `${item.name} (${item.user_no})`,
                    group: item.relationship.length,
                })),
                edges: $chartData.flatMap((from) =>
                    from.relationship.map((to) => ({
                        id: `${from.user_no}_${to.user_no}`,
                        from: from.user_no,
                        to: to.user_no,
                        value: to.comments + to.mentions,
                        title: `댓글 수: ${to.comments}\n멘션 수: ${to.mentions}`,
                    }))
                ),
            };

            console.debug(graph);

            const options = {
                layout: {
                    hierarchical: false,
                    improvedLayout: false,
                },
                edges: {
                    color: '#000000',
                },
                physics: {
                    enabled: false,
                },
            };

            const events = {
                select: function (event) {
                    console.debug('On select node', event);
                },
            };

            let [resizeGraph, setResizeGraph] = useState(null);

            useEffect(() => {
                resizeGraph && resizeGraph();
                window.addEventListener('resize', resizeGraph);
                return () => window.removeEventListener('resize', resizeGraph);
            }, [graph, resizeGraph]);

            return (
                <>
                    <GraphStyle />
                    <Graph
                        key={Date.now()}
                        graph={graph}
                        options={options}
                        events={events}
                        getNetwork={(network) => {
                            const container = network.view.body.container;
                            console.debug('Graph container size', container.clientWidth, container.clientHeight);

                            setResizeGraph(() => {
                                network.setSize(0, 0);
                                console.debug('Graph container size', container.clientWidth, container.clientHeight);
                                network.setSize(container.clientWidth, container.clientHeight);
                                network.fit();
                            });

                            console.debug($criteria.hubSize ?? 0);

                            network.clustering.clusterByHubsize(($criteria.hubSize ?? 0) * 2, {
                                clusterNodeProperties: { label: '주로 대화하는 사용자', x: 0, y: 0 },
                            });
                        }}
                    />
                </>
            );
        },
    },
    (data, criteria) =>
        Object.values(
            data.posts.reduce((acc, post) => {
                if (
                    !new Date(post.created_at).isBetween(criteria.since, criteria.until) ||
                    (criteria.userlist.length > 0 &&
                        // If both conditions are all true or false (i.e. true and true, false and false)
                        !!(criteria.isUserlistForExclude ^ (criteria.userlist.indexOf(post.author.user_no) === -1)))
                )
                    return acc;

                createItem(acc, post.author);

                [...post.content.matchAll(/<band:refer user_no="(\d*)">/gi)].forEach(([_, user_no]) => {
                    const userNo = Number(user_no);
                    createRelationship(acc, post.author.user_no, userNo).mentions++;
                });

                post.comments.reduce((acc, comment) => {
                    if (
                        new Date(comment.created_at).isBetween(criteria.since, criteria.until) &&
                        (criteria.userlist.length === 0 ||
                            // If both conditions are all true or false (i.e. true and true, false and false)
                            !(
                                criteria.isUserlistForExclude ^
                                (criteria.userlist.indexOf(comment.author.user_no) === -1)
                            ))
                    ) {
                        createItem(acc, comment.author);

                        [...comment.body.matchAll(/<band:refer user_no="(\d*)">/gi)].forEach(([_, user_no]) => {
                            const userNo = Number(user_no);
                            createRelationship(acc, comment.author.user_no, userNo).mentions++;
                        });

                        createRelationship(acc, post.author.user_no, comment.author.user_no).comments++;
                    }

                    comment.comments.reduce((acc, comment) => {
                        if (
                            new Date(comment.created_at).isBetween(criteria.since, criteria.until) &&
                            (criteria.userlist.length === 0 ||
                                // If both conditions are all true or false (i.e. true and true, false and false)
                                !(
                                    criteria.isUserlistForExclude ^
                                    (criteria.userlist.indexOf(comment.author.user_no) === -1)
                                ))
                        ) {
                            createItem(acc, comment.author);

                            [...comment.body.matchAll(/<band:refer user_no="(\d*)">/gi)].forEach(([_, user_no]) => {
                                const userNo = Number(user_no);
                                createRelationship(acc, comment.author.user_no, userNo).mentions++;
                            });
                        }

                        return acc;
                    }, acc);

                    return acc;
                }, acc);

                return acc;
            }, {})
        ).map((item) => ({ ...item, relationship: Object.values(item.relationship) }))
);
