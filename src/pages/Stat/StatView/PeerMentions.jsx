import React, { useEffect } from 'react';
import { createStatView, SeriesType } from './AbstractStatView';
import Graph from 'react-graph-vis';
import { createGlobalStyle } from 'styled-components';

const GraphStyle = createGlobalStyle`
    div.vis-tooltip {
        position: absolute;
        color: black;
        border: 1px solid black;
        background-color: white;
    }
`;

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
        ChartElement: ({ $chartData, $chartOptions, $criteria }) => {
            const graph = {
                nodes: [
                    { id: 1, label: 'Node 1', title: 'node 1 tootip text' },
                    { id: 2, label: 'Node 2', title: 'node 2 tootip text' },
                    { id: 3, label: 'Node 3', title: 'node 3 tootip text' },
                    { id: 4, label: 'Node 4', title: 'node 4 tootip text' },
                    { id: 5, label: 'Node 5', title: 'node 5 tootip text' },
                ],
                edges: [
                    { from: 1, to: 2, value: 1, title: 'absolute' },
                    { from: 1, to: 3, value: 3 },
                    { from: 2, to: 4, value: 5 },
                    { from: 2, to: 5, value: 7 },
                ],
            };

            const options = {
                layout: {
                    hierarchical: true,
                },
                edges: {
                    color: '#000000',
                },
            };

            const events = {
                select: function (event) {
                    var { nodes, edges } = event;
                    console.debug('On select node', event);
                },
            };

            let resizeGraph;

            useEffect(() => {
                return () => window.removeEventListener('resize', resizeGraph);
            });

            return (
                <>
                    <GraphStyle />
                    <Graph
                        graph={graph}
                        options={options}
                        events={events}
                        getNetwork={(network) => {
                            const container = network.view.body.container;
                            console.debug('Graph container size', container.clientWidth, container.clientHeight);

                            resizeGraph = () => {
                                network.setSize(0, 0);
                                console.debug('Graph container size', container.clientWidth, container.clientHeight);
                                network.setSize(container.clientWidth, container.clientHeight);
                                network.fit();
                            };

                            window.addEventListener('resize', resizeGraph);
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

                if (!acc[post.author.user_no])
                    acc[post.author.user_no] = { name: post.author.name, reads: 0, comments: 0, emotions: 0, posts: 0 };

                acc[post.author.user_no].posts++;
                acc[post.author.user_no].reads += post.read_count;
                acc[post.author.user_no].comments += post.comment_count;
                acc[post.author.user_no].emotions += post.emotion_count;

                return acc;
            }, {})
        ).sort(
            !criteria.sort || criteria.sort === 'name'
                ? (a, b) => a.name.localeCompare(b.name) * (criteria.reverse ? -1 : 1)
                : criteria.sort === 'total-value'
                ? (a, b) =>
                      (b.reads + b.comments + b.emotions - (a.reads + a.comments + a.emotions)) *
                      (criteria.reverse ? -1 : 1)
                : (a, b) => (b[criteria.sort] - a[criteria.sort]) * (criteria.reverse ? -1 : 1)
        )
);
