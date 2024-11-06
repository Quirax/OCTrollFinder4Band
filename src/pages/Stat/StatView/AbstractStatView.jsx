import React from 'react';
import styled from 'styled-components';

const AbstractStatView = styled.section.attrs(({ $title, $description, $chartData, $chartOptions }) => ({
    children: (
        <>
            <h2>{$title}</h2>
            <p>{$description}</p>
            <div class="graph">Graph!</div>
        </>
    ),
}))`
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

const commonChartDataGenerator = (data) => data; // TODO: implement chart data generator

export const createStatView = (title, description, chartOptions, chartDataGenerator = (data) => data) => ({
    title,
    description,
    View: ({ data }) => (
        <AbstractStatView
            $title={title}
            $description={description}
            $chartData={commonChartDataGenerator(chartDataGenerator(data))}
            $chartOptions={chartOptions}
        />
    ),
});
