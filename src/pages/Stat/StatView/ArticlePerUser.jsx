import React from 'react';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend } from 'recharts';
import { createStatView } from './AbstractStatView';

export const ArticlePerUser = createStatView(
    '사용자당 게시물 및 댓글 개수',
    '각 사용자가 작성한 게시물 및 댓글의 개수입니다. 총합의 내림차순으로 정렬됩니다.',
    (data) => ({
        children: (
            <AreaChart data={data}>
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
                <Area type="monotone" dataKey="posts" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="comments" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
        ),
    }),
    (data) =>
        Object.values(
            data.posts.reduce((acc, post) => {
                if (!acc[post.author.user_no])
                    acc[post.author.user_no] = { name: post.author.name, posts: 0, comments: 0 };
                acc[post.author.user_no].posts++;

                post.comments.reduce((acc, comment) => {
                    if (!acc[comment.author.user_no])
                        acc[comment.author.user_no] = { name: comment.author.name, posts: 0, comments: 0 };
                    acc[comment.author.user_no].comments++;

                    comment.comments.reduce((acc, comment) => {
                        if (!acc[comment.author.user_no])
                            acc[comment.author.user_no] = { name: comment.author.name, posts: 0, comments: 0 };
                        acc[comment.author.user_no].comments++;

                        return acc;
                    }, acc);

                    return acc;
                }, acc);

                return acc;
            }, {})
        ).sort((a, b) => b.posts + b.comments - (a.posts + a.comments))
);
