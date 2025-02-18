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
