import React from 'react';
import { createStatView, SeriesType } from './AbstractStatView';

/**
 * @type {import('./AbstractStatView').StatView}
 */
export const PeerMentions = createStatView(
    '사용자 간 멘션 횟수',
    '사용자끼리 댓글을 달거나 멘션한 횟수를 나타낸 관계도입니다',
    {
        extendXAxis: true,
        series: [
            {
                name: '댓글 횟수',
                type: SeriesType.Line,
                key: 'comments',
                stroke: '#ff7300',
                fill: '#ff7300',
                stackId: 1,
            },
            {
                name: '멘션 횟수',
                type: SeriesType.Line,
                key: 'mentions',
                stroke: '#8884d8',
                fill: '#8884d8',
                stackId: 1,
            },
        ],
        ChartElement: ({ $chartData, $chartOptions, $criteria }) => <></>,
    },
    (data, criteria) =>
        Object.values(
            data.posts.reduce((acc, post) => {
                if (
                    !new Date(post.created_at).isBetween(criteria.since, criteria.until) ||
                    (criteria.userlist.length > 0 &&
                        // If both conditions are all true or false (i.e. true and true, false and false)
                        !!(criteria.isUserlistForExclude ^ (criteria.userlist.indexOf(post.author.user_no) === -1)))
                )
                    return acc;

                if (!acc[post.author.user_no])
                    acc[post.author.user_no] = { name: post.author.name, reads: 0, comments: 0, emotions: 0, posts: 0 };

                acc[post.author.user_no].posts++;
                acc[post.author.user_no].reads += post.read_count;
                acc[post.author.user_no].comments += post.comment_count;
                acc[post.author.user_no].emotions += post.emotion_count;

                return acc;
            }, {})
        ).sort(
            !criteria.sort || criteria.sort === 'name'
                ? (a, b) => a.name.localeCompare(b.name) * (criteria.reverse ? -1 : 1)
                : criteria.sort === 'total-value'
                ? (a, b) =>
                      (b.reads + b.comments + b.emotions - (a.reads + a.comments + a.emotions)) *
                      (criteria.reverse ? -1 : 1)
                : (a, b) => (b[criteria.sort] - a[criteria.sort]) * (criteria.reverse ? -1 : 1)
        )
);
