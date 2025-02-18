import React from 'react';
import { styled } from 'styled-components';

/**
 * @callback CriteriaElement
 * @param {{ $chartOptions: import('./AbstractStatView').ChartOptions, $criteria: import('./AbstractStatView').Criteria, $setCriteria: React.Dispatch<React.SetStateAction<import('./AbstractStatView').Criteria>>, $userList: Array<{ name: string, userNo: number }> }} attrs
 * @returns {import('styled-components').Attrs}
 */

export const SortCriteria = styled.div.attrs(
    /**
     * @type CriteriaElement
     */
    ({ $chartOptions = {}, $criteria = {}, $setCriteria = () => {}, $userList = [] }) => ({
        children: (
            <>
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
            </>
        ),
    })
)``;

// ref: https://velog.io/@rkio/Javascript-YYYY-MM-DD-%ED%98%95%ED%83%9C%EC%9D%98-%EB%82%A0%EC%A7%9C-%EC%A0%95%EB%B3%B4%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90
const formatDate = (date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
        .getDate()
        .toString()
        .padStart(2, '0')}`;

export const DateCriteria = styled.div.attrs(
    /**
     * @type CriteriaElement
     */
    ({ $chartOptions = {}, $criteria = {}, $setCriteria = () => {}, $userList = [] }) => ({
        children: (
            <>
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
            </>
        ),
    })
)``;
