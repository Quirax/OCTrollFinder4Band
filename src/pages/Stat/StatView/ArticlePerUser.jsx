import { createStatView, SeriesType } from './AbstractStatView';

/**
 * @type {import('./AbstractStatView').StatView}
 */
export const ArticlePerUser = createStatView(
    '사용자당 게시물 및 댓글 개수',
    '각 사용자가 작성한 게시물 및 댓글의 개수입니다. 총합의 내림차순으로 정렬됩니다.',
    {
        extendXAxis: true,
        series: [
            {
                name: '게시물 개수',
                type: SeriesType.Area,
                key: 'posts',
                stroke: '#8884d8',
                fill: '#8884d8',
                stackId: 1,
            },
            {
                name: '댓글 개수',
                type: SeriesType.Area,
                key: 'comments',
                stroke: '#82ca9d',
                fill: '#82ca9d',
                stackId: 1,
            },
        ],
    },
    (data, criteria) =>
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
        ).sort(
            !criteria.sort || criteria.sort === 'name'
                ? (a, b) => a.name.localeCompare(b.name) * (criteria.reverse ? -1 : 1)
                : criteria.sort === 'total-value'
                ? (a, b) => (b.posts + b.comments - (a.posts + a.comments)) * (criteria.reverse ? -1 : 1)
                : (a, b) => (b[criteria.sort] - a[criteria.sort]) * (criteria.reverse ? -1 : 1)
        )
);
