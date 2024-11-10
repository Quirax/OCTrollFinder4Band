import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { generateCategoricalChart } from 'recharts/types/chart/generateCategoricalChart';
import styled from 'styled-components';

/**
 * @typedef {any[]} ChartData
 */

/**
 * @typedef ChartOptions
 */
const AbstractStatView = styled.section.attrs(
    /**
     * @param {object} attrs
     * @param {string} attrs.$title The title of the stat view
     * @param {string} attrs.$description The description of the stat view
     * @param {ChartData} attrs.$chartData The data of chart shown in the stat view
     * @param {(data: ChartData) => ChartOptions} attrs.$chartOptions The options of chart shown in the stat view
     * @returns {import('styled-components').Attrs}
     */
    ({ $title, $description, $chartData = [], $chartOptions = (data) => ({}) }) => ({
        children: (
            <>
                <h2>{$title}</h2>
                <p>{$description}</p>
                <div className="graph">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                        children={
                            <LineChart data={$chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        }
                        {...$chartOptions($chartData)}
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
 * @param {(data: ChartData) => ChartOptions} chartOptions The options of chart shown in the stat view
 * @param {(data: object) => ChartData} chartDataGenerator A generator of chart data from input data
 * @returns {StatView} The object describes the stat view
 */
export const createStatView = (
    title,
    description,
    chartOptions = (data) => ({}),
    chartDataGenerator = (data) => data
) => ({
    title,
    description,
    View: ({ data }) => (
        <AbstractStatView
            $title={title}
            $description={description}
            $chartData={chartDataGenerator(data)}
            $chartOptions={chartOptions}
        />
    ),
});
