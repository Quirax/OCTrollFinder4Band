import React, { useEffect, useState } from 'react';
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
 */
const SeriesView = (series = [], first) =>
    series
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
 */

const CriteriaPanel = styled.fieldset.attrs(
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
                <legend>표시 옵션</legend>
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
            </>
        ),
    })
)`
    margin-bottom: 1rem;
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
                                {SeriesView($chartOptions.series, $criteria.sort)}
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
        const [criteria, setCriteria] = useState(() => ({ sort: 'name', reverse: false }));

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
