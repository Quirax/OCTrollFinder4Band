import React from 'react';
import { CartesianGrid, Legend, Line, Area, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { createEnum } from '../../../modules/util';

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
 */
const SeriesView = (series = []) =>
    series.map(({ type, name, key, stroke, fill, stackId } = {}, idx) => {
        switch (type) {
            case 'Line':
                return <Line key={`series-${idx}`} type="monotone" dataKey={key} {...{ name, stroke }} />;
            case 'Area':
                return (
                    <Area key={`series-${idx}`} type="monotone" dataKey={key} {...{ name, stroke, fill, stackId }} />
                );
        }
    });

const CriteriaPanel = styled.fieldset.attrs(({}) => ({
    children: (
        <>
            <legend>표시 옵션</legend>
        </>
    ),
}))`
    margin-bottom: 1rem;
`;

const AbstractStatView = styled.section.attrs(
    /**
     * @param {object} attrs
     * @param {string} attrs.$title The title of the stat view
     * @param {string} attrs.$description The description of the stat view
     * @param {ChartData} attrs.$chartData The data of chart shown in the stat view
     * @param {ChartOptions} attrs.$chartOptions The options of chart shown in the stat view
     * @returns {import('styled-components').Attrs}
     */
    ({ $title, $description, $chartData = [], $chartOptions = {} }) => ({
        children: (
            <>
                <h2>{$title}</h2>
                <p>{$description}</p>
                <CriteriaPanel />
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
                                {SeriesView($chartOptions.series)}
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
 * @param {(data: object) => ChartData} chartDataGenerator A generator of chart data from input data
 * @returns {StatView} The object describes the stat view
 */
export const createStatView = (title, description, chartOptions = {}, chartDataGenerator = (data) => data) => ({
    title,
    description,
    View: ({ data }) => {
        return (
            <AbstractStatView
                $title={title}
                $description={description}
                $chartData={chartDataGenerator(data)}
                $chartOptions={chartOptions}
            />
        );
    },
});
