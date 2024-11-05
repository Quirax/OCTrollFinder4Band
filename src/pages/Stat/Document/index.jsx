import React from 'react';
import { CoverFront } from './CoverFront';

export const Document = ({ data }) => {
    console.debug(data);

    return (
        <>
            <CoverFront
                cover={data.bandInfo.cover}
                leaderName={data.bandInfo.leader_name}
                memberCount={data.bandInfo.member_count}
                name={data.bandInfo.name}
                since={data.bandInfo.since}
                themeColor={data.bandInfo.theme_color}
                updatedAt={Math.max(...Object.values(data.bandInfo.updated_at_status))}
                webUrl={data.bandInfo.web_url}
            />
        </>
    );
};
