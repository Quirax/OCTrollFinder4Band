import React, { Fragment, useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, Area, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { createEnum, makeId } from '../../../modules/util';

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
     * @returns {import('styled-components').Attrs}
     */
    ({ $chartOptions = {}, $criteria = {}, $setCriteria = () => {} }) => ({
        children: (
            <>
                <summary>표시 옵션</summary>
                <div>
                    <label htmlFor="criteria-sort">정렬 기준: </label>
                    <select
                        id="criteria-sort"
                        value={$criteria.sort}
                        onChange={(e) => $setCriteria({ ...$criteria, sort: e.target.value })}
                    >
                        <option value="name">이름</option>
                        <option value="total-value">총합</option>
                        {$chartOptions.series.map(({ name, key }, idx) => (
                            <option key={`criteria-sort-${idx}`} value={key}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="checkbox"
                        id="criteria-reverse"
                        checked={$criteria.reverse}
                        onChange={(e) => $setCriteria({ ...$criteria, reverse: e.target.checked })}
                    />
                    <label htmlFor="criteria-reverse">역순</label>
                </div>
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

const AbstractStatView = styled.section.attrs(
    /**
     * @param {object} attrs
     * @param {string} attrs.$title The title of the stat view
     * @param {string} attrs.$description The description of the stat view
     * @param {ChartData} attrs.$chartData The data of chart shown in the stat view
     * @param {ChartOptions} attrs.$chartOptions The options of chart shown in the stat view
     * @param {Criteria} attrs.$criteria The criteria object that controls view
     * @param {React.Dispatch<React.SetStateAction<Criteria>>} attrs.$setCriteria The setter of criteria object
     * @returns {import('styled-components').Attrs}
     */
    ({ $title, $description, $chartData = [], $chartOptions = {}, $criteria = {}, $setCriteria = () => {} }) => ({
        children: (
            <>
                <h2>{$title}</h2>
                <p>{$description}</p>
                <CriteriaPanel $chartOptions={$chartOptions} $criteria={$criteria} $setCriteria={$setCriteria} />
                <div className="graph">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
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
        }));

        console.log(criteria);

        return (
            <AbstractStatView
                $title={title}
                $description={description}
                $chartData={chartDataGenerator(data, criteria)}
                $chartOptions={chartOptions}
                $criteria={criteria}
                $setCriteria={setCriteria}
            />
        );
    },
});
