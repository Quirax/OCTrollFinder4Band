import React, { Fragment, useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, Area, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { createEnum, makeId } from '../../../modules/util';
import { Tokenizer } from 'react-typeahead';
import { DateCriteria, SeriesCriteria, SortCriteria, UserCriteria } from './Criteria';

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
 * @property {CriteriaElements} CriteriaElements A renderer of criteria elements
 */

/**
 * @callback ChartElement
 * @param {{ $chartData: ChartData, $chartOptions: ChartOptions, $criteria: Criteria }} attrs
 * @returns {React.JSX.Element}
 */

/**
 * @callback CriteriaElements
 * @param {{ $chartOptions: ChartOptions, $criteria: Criteria, $setCriteria: React.Dispatch<React.SetStateAction<Criteria>>, $userList: Array<{ name: string, userNo: number }> }} attrs
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
                {children}
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

/**
 * @type {CriteriaElements}
 */
const DefaultCriteriaElements = ({ $chartOptions = {}, $criteria = {}, $setCriteria = () => {}, $userList = [] }) => (
    <>
        <SortCriteria
            $chartOptions={$chartOptions}
            $criteria={$criteria}
            $setCriteria={$setCriteria}
            $userList={$userList}
        />
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
    </>
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
                >
                    <$chartOptions.CriteriaElements
                        $chartOptions={$chartOptions}
                        $criteria={$criteria}
                        $setCriteria={$setCriteria}
                        $userList={$userList}
                    />
                </CriteriaPanel>
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
        chartOptions.CriteriaElements = chartOptions.CriteriaElements || DefaultCriteriaElements;

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
