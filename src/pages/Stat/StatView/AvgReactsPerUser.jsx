import { createStatView, SeriesType } from './AbstractStatView';

/**
 * @type {import('./AbstractStatView').StatView}
 */
export const AvgReactsPerUser = createStatView(
    '사용자당 받은 평균 반응 수',
    '각 사용자가 작성한 게시물의 통계 작성 시점의 평균 조회수, 댓글 수 및 표정 수입니다.',
    {
        extendXAxis: true,
        series: [
            {
                name: '게시물 개수',
                type: SeriesType.Line,
                key: 'posts',
                stroke: '#ff7300',
                fill: '#ff7300',
                stackId: 1,
            },
            {
                name: '평균 조회수',
                type: SeriesType.Area,
                key: 'reads',
                stroke: '#8884d8',
                fill: '#8884d8',
                stackId: 1,
            },
            {
                name: '평균 댓글수',
                type: SeriesType.Area,
                key: 'comments',
                stroke: '#82ca9d',
                fill: '#82ca9d',
                stackId: 1,
            },
            {
                name: '평균 표정수',
                type: SeriesType.Area,
                key: 'emotions',
                stroke: '#ffc658',
                fill: '#ffc658',
                stackId: 1,
            },
        ],
    },
    (data, criteria) =>
        Object.values(
            data.posts.reduce((acc, post) => {
                if (
                    !new Date(post.created_at).isBetween(criteria.since, criteria.until) ||
                    (criteria.userlist.length > 0 &&
                        // If both conditions are all true or false (i.e. true and true, false and false)
                        !!(criteria.isUserlistForExclude ^ (criteria.userlist.indexOf(post.author.name) === -1)))
                )
                    return acc;

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
            .sort(
                !criteria.sort || criteria.sort === 'name'
                    ? (a, b) => a.name.localeCompare(b.name) * (criteria.reverse ? -1 : 1)
                    : criteria.sort === 'total-value'
                    ? (a, b) =>
                          (b.reads + b.comments + b.emotions - (a.reads + a.comments + a.emotions)) *
                          (criteria.reverse ? -1 : 1)
                    : (a, b) => (b[criteria.sort] - a[criteria.sort]) * (criteria.reverse ? -1 : 1)
            )
);
