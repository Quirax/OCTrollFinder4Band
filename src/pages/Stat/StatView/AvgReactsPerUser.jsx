import React from 'react';
import { ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend, Line } from 'recharts';
import { createStatView } from './AbstractStatView';

/**
 * @type {import('./AbstractStatView').StatView}
 */
export const AvgReactsPerUser = createStatView(
    '사용자당 받은 평균 반응 수',
    '각 사용자가 작성한 게시물의 평균 조회수, 댓글 수 및 표정 수입니다. 총합의 내림차순으로 정렬됩니다.',
    (data) => ({
        children: (
            <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    // ref: https://github.com/recharts/recharts/issues/397
                    dataKey="name"
                    textAnchor="end"
                    sclaeToFit="true"
                    verticalAnchor="start"
                    interval={0}
                    angle="-40"
                    height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Line type="monotone" dataKey="posts" stroke="#ff7300" />
                <Area type="monotone" dataKey="reads" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="comments" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="emotions" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </ComposedChart>
        ),
    }),
    (data) =>
        Object.values(
            data.posts.reduce((acc, post) => {
                if (!acc[post.author.user_no])
                    acc[post.author.user_no] = { name: post.author.name, posts: 0, reads: 0, comments: 0, emotions: 0 };

                acc[post.author.user_no].posts++;
                acc[post.author.user_no].reads += post.read_count;
                acc[post.author.user_no].comments += post.comment_count;
                acc[post.author.user_no].emotions += post.emotion_count;

                return acc;
            }, {})
        )
            .map((v) => ({
                name: v.name,
                posts: v.posts,
                reads: v.reads / v.posts,
                comments: v.comments / v.posts,
                emotions: v.emotions / v.posts,
            }))
            .sort((a, b) => b.reads + b.comments + b.emotions - (a.reads + a.comments + a.emotions))
);
