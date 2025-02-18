import React, { Fragment } from 'react';
import { Tokenizer } from 'react-typeahead';
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

export const SeriesCriteria = styled.div.attrs(
    /**
     * @type CriteriaElement
     */
    ({ $chartOptions = {}, $criteria = {}, $setCriteria = () => {}, $userList = [] }) => ({
        children: (
            <>
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
            </>
        ),
    })
)``;

export const UserCriteria = styled.fieldset.attrs(
    /**
     * @type CriteriaElement
     */
    ({ $chartOptions = {}, $criteria = {}, $setCriteria = () => {}, $userList = [] }) => ({
        children: (
            <>
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
            </>
        ),
    })
)`
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
