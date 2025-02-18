import React, { Fragment, useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, Area, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { createEnum, makeId } from '../../../modules/util';
import { Tokenizer } from 'react-typeahead';
import { SortCriteria } from './Criteria';

/**
 * @enum {{Line, Area}} The type of series
 * @type {SeriesType}
 */
export const SeriesType = createEnum('Line', 'Area');

/**
 * @typedef {any[]} ChartData
 */

/**
 * @typedef Series
 * @property {string} name A name of series
 * @property {string} key A key of series in chart data
 * @property {string} stroke A stroke color of series
 * @property {string} [fill] A fill color of series
 * @property {SeriesType} type A type of series
 * @property {string|number} [stackId] An id of stack for area series
 */

/**
 * @typedef ChartOptions
 * @property {string} categoryKey A key of chart data that describes category
 * @property {boolean} extendXAxis A flag whether the chart needs to extend X axis
 * @property {Series[]} series A list of series
 * @property {ChartElement} ChartElement A renderer of chart
 */

/**
 * @callback ChartElement
 * @param {{ $chartData: ChartData, $chartOptions: ChartOptions, $criteria: Criteria }} attrs
 * @returns {React.JSX.Element}
 */

/**
 * @param {Series[]} series
 * @param {string} first
 * @param {object} show
 */
const SeriesView = (series = [], first, show = {}) =>
    series
        .filter((v) => show[v.key])
        .map((v, i) => ({ ...v, idx: v.key === first ? -1 : i }))
        .sort((a, b) => a.idx - b.idx)
        .map(({ type, name, key, stroke, fill, stackId } = {}, idx) => {
            switch (type) {
                case 'Line':
                    return <Line key={makeId(10)} type="monotone" dataKey={key} {...{ name, stroke }} />;
                case 'Area':
                    return <Area key={makeId(10)} type="monotone" dataKey={key} {...{ name, stroke, fill, stackId }} />;
            }
        });

/**
 * @typedef Criteria
 * @property {string} sort
 * @property {boolean} reverse
 * @property {Date} since
 * @property {Date} until
 * @property {object} show
 * @property {Array<number>} userlist
 * @property {boolean} isUserlistForExclude
 */

// ref: https://velog.io/@rkio/Javascript-YYYY-MM-DD-%ED%98%95%ED%83%9C%EC%9D%98-%EB%82%A0%EC%A7%9C-%EC%A0%95%EB%B3%B4%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90
const formatDate = (date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
        .getDate()
        .toString()
        .padStart(2, '0')}`;

const CriteriaPanel = styled.details.attrs(
    /**
     * @param {object} attrs
     * @param {ChartOptions} attrs.$chartOptions The options of chart shown in the stat view
     * @param {Criteria} attrs.$criteria The criteria object that controls view
     * @param {React.Dispatch<React.SetStateAction<Criteria>>} attrs.$setCriteria The setter of criteria object
     * @param {Array<{ name: string, userNo: number }>} attrs.$userList List of users shown in the view
     * @param {React.JSX.Element} attrs.children Criteria elements
     * @returns {import('styled-components').Attrs}
     */
    ({ $chartOptions = {}, $criteria = {}, $setCriteria = () => {}, $userList = [], children }) => ({
        children: (
            <>
                <summary>표시 옵션</summary>
                <SortCriteria
                    $chartOptions={$chartOptions}
                    $criteria={$criteria}
                    $setCriteria={$setCriteria}
                    $userList={$userList}
                />
                <div>
                    기간:{' '}
                    <input
                        type="date"
                        value={formatDate($criteria.since)}
                        onChange={(e) => {
                            let since = new Date(e.target.value).truncTime();
                            $setCriteria({
                                ...$criteria,
                                since,
                                until: new Date(Math.max(since, $criteria.until)).truncTime(),
                            });
                        }}
                    />{' '}
                    ~{' '}
                    <input
                        type="date"
                        min={formatDate($criteria.since)}
                        value={formatDate($criteria.until)}
                        onChange={(e) => $setCriteria({ ...$criteria, until: new Date(e.target.value).truncTime() })}
                    />
                </div>
                <div>
                    표시할 항목:{' '}
                    {$chartOptions.series.map(({ name, key }, idx) => (
                        <Fragment key={`criteria-show-${key}`}>
                            <input
                                type="checkbox"
                                id={`criteria-show-${key}`}
                                checked={$criteria.show[key]}
                                onChange={(e) => {
                                    let show = $criteria.show;
                                    show[key] = e.target.checked;
                                    $setCriteria({ ...$criteria, show });
                                }}
                            />
                            <label htmlFor={`criteria-show-${key}`}>{name}</label>{' '}
                        </Fragment>
                    ))}
                </div>
                <fieldset>
                    <legend>표시할 사용자</legend>
                    <Tokenizer
                        options={$userList.filter(({ userNo }) => $criteria.userlist.indexOf(userNo) === -1)}
                        placeholder="사용자를 선택하세요."
                        displayOption="name"
                        filterOption="name"
                        onTokenAdd={(token) => {
                            let userlist = $criteria.userlist;
                            userlist.push(token.userNo);
                            $setCriteria({ ...$criteria, userlist });
                        }}
                        onTokenRemove={(token) => {
                            let userlist = $criteria.userlist;
                            let idx = userlist.findIndex((v) => v === token.userNo);
                            if (idx > -1) userlist.splice(idx, 1);
                            $setCriteria({ ...$criteria, userlist });
                        }}
                        showOptionsWhenEmpty={true}
                    />
                    <div>
                        <input
                            type="radio"
                            id="criteria-user-bound"
                            name="criteria-user"
                            checked={!$criteria.isUserlistForExclude}
                            onChange={(e) => $setCriteria({ ...$criteria, isUserlistForExclude: !e.target.checked })}
                        />
                        <label htmlFor="criteria-user-bound">선택한 사용자들만 표시</label>
                        <input
                            type="radio"
                            id="criteria-user-exclude"
                            name="criteria-user"
                            checked={$criteria.isUserlistForExclude}
                            onChange={(e) => $setCriteria({ ...$criteria, isUserlistForExclude: e.target.checked })}
                        />
                        <label htmlFor="criteria-user-exclude">선택한 사용자들을 제외하고 표시</label>
                    </div>
                </fieldset>
            </>
        ),
    })
)`
    margin-bottom: 1rem;
    border: 1px solid black;
    padding: 1rem;

    &[open] summary {
        margin-bottom: 1rem;
    }

    div.typeahead-tokenizer {
        div.typeahead-token {
            border: 1px solid black;
            padding: 0.5em;
            display: inline-block;

            &:not(:first-child) {
                border-left: none;
            }

            a.typeahead-token-close {
                margin-left: 0.5em;
                text-decoration: none;
                color: gray;
            }
        }

        div.typeahead {
            margin-top: 0.5rem;

            input {
                width: 100%;
            }

            ul.typeahead-selector {
                position: absolute;
                border: 1px solid black;
                list-style: none;
                margin: 0;
                padding: 0;
                z-index: 1;
                max-height: 15rem;
                overflow-y: scroll;

                li {
                    padding: 1rem;
                    border-bottom: 1px solid black;
                    background: white;
                    cursor: pointer;

                    &:last-child {
                        border-bottom: none;
                    }

                    a {
                        text-decoration: none;
                        color: black;
                    }
                }
            }
        }
    }
`;

/**
 * @type {ChartElement}
 */
const Rechart = ({ $chartData = [], $chartOptions = {}, $criteria = {} }) => (
    <ResponsiveContainer
        width="100%"
        height="100%"
        // TODO: refactor
        children={
            <ComposedChart data={$chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    // ref: https://github.com/recharts/recharts/issues/397
                    dataKey={$chartOptions.categoryKey || 'name'}
                    {...($chartOptions.extendXAxis && {
                        textAnchor: 'end',
                        interval: 0,
                        angle: -40,
                        height: 100,
                    })}
                />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
                {SeriesView($chartOptions.series, $criteria.sort, $criteria.show)}
            </ComposedChart>
        }
    />
);

const AbstractStatView = styled.section.attrs(
    /**
     * @param {object} attrs
     * @param {string} attrs.$title The title of the stat view
     * @param {string} attrs.$description The description of the stat view
     * @param {ChartData} attrs.$chartData The data of chart shown in the stat view
     * @param {ChartOptions} attrs.$chartOptions The options of chart shown in the stat view
     * @param {Criteria} attrs.$criteria The criteria object that controls view
     * @param {React.Dispatch<React.SetStateAction<Criteria>>} attrs.$setCriteria The setter of criteria object
     * @param {Array<{ name: string, userNo: number }>} attrs.$userList List of users shown in the view
     * @returns {import('styled-components').Attrs}
     */
    ({
        $title,
        $description,
        $chartData = [],
        $chartOptions = {},
        $criteria = {},
        $setCriteria = () => {},
        $userList = [],
    }) => ({
        children: (
            <>
                <h2>{$title}</h2>
                <p>{$description}</p>
                <CriteriaPanel
                    $chartOptions={$chartOptions}
                    $criteria={$criteria}
                    $setCriteria={$setCriteria}
                    $userList={$userList}
                />
                <div className="graph">
                    <$chartOptions.ChartElement
                        $chartData={$chartData}
                        $chartOptions={$chartOptions}
                        $criteria={$criteria}
                    />
                </div>
            </>
        ),
    })
)`
    padding: var(--content-padding);
    width: 100%;
    height: calc(100% - (var(--content-padding) * 2));
    display: flex;
    flex-direction: column;

    & > div.graph {
        width: 100%;
        height: 100%;
        border: 1px solid black;
        box-sizing: border-box;
    }
`;

// ref: https://java119.tistory.com/76
const sinceToDate = (since) => {
    let ymd = String(since);
    let y = ymd.substring(0, 4),
        m = ymd.substring(4, 6),
        d = ymd.substring(6, 8);
    return new Date(Number(y), Number(m) - 1, Number(d));
};

/**
 * @typedef StatView
 * @property {string} title The title of the stat view
 * @property {string} description The description of the stat view
 * @property {(props: { data: ChartData }) => React.JSX.Element} View The React View of the stat view
 */

/**
 * @param {string} title The title of the stat view
 * @param {string} description The description of the stat view
 * @param {ChartOptions} chartOptions The options of chart shown in the stat view
 * @param {(data: object, criteria: Criteria) => ChartData} chartDataGenerator A generator of chart data from input data
 * @returns {StatView} The object describes the stat view
 */
export const createStatView = (title, description, chartOptions = {}, chartDataGenerator = (data) => data) => ({
    title,
    description,
    View: ({ data }) => {
        /**
         * @type [Criteria, React.Dispatch<React.SetStateAction<Criteria>>]
         */
        const [criteria, setCriteria] = useState(() => ({
            sort: 'name',
            reverse: false,
            since: sinceToDate(data.bandInfo.since),
            until: new Date(Math.max(...Object.values(data.bandInfo.updated_at_status))),
            show: Object.fromEntries(chartOptions.series.map((series) => [series.key, true])),
            userlist: [],
            isUserlistForExclude: false,
        }));

        console.log(criteria);

        chartOptions.ChartElement = chartOptions.ChartElement || Rechart;

        const userList = Object.values(
            data.posts.reduce((acc, post) => {
                if (!acc[post.author.user_no])
                    acc[post.author.user_no] = { name: post.author.name, userNo: post.author.user_no };

                post.comments.reduce((acc, comment) => {
                    if (!acc[comment.author.user_no])
                        acc[comment.author.user_no] = { name: comment.author.name, userNo: comment.author.user_no };

                    comment.comments.reduce((acc, comment) => {
                        if (!acc[comment.author.user_no])
                            acc[comment.author.user_no] = { name: comment.author.name, userNo: comment.author.user_no };

                        return acc;
                    }, acc);

                    return acc;
                }, acc);

                return acc;
            }, {})
        );

        return (
            <AbstractStatView
                $title={title}
                $description={description}
                $chartData={chartDataGenerator(data, criteria)}
                $userList={userList}
                $chartOptions={chartOptions}
                $criteria={criteria}
                $setCriteria={setCriteria}
            />
        );
    },
});
