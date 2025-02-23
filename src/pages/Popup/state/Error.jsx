import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { styled } from 'styled-components';

const errorMessage = (title, description) => ({ title, description });

const applyArgs = (message, args) => (typeof message === 'function' ? message(args) : message);

export const ErrorMessage = Object.freeze({
    NonBand: errorMessage('현재 탭에서 사용할 수 없습니다', '밴드 페이지 탭에서 다시 시도하세요.'),
    NotAColeader: errorMessage(
        '이 밴드의 총괄진이 아닙니다',
        '리더와 공동리더로 등록된 사용자만 사용할 수 있습니다. 총괄에게 문의하세요.'
    ),
    RespondWithError: errorMessage(
        <>
            Band와 통신하는 도중
            <br />
            오류가 발생하였습니다
        </>,
        ({ response, at }) => (
            <>
                <p>
                    지속적으로 같은 오류가 발생한다면,
                    <br />
                    아래 오류 메시지를 복사하여
                    <br />
                    개발자에게 알려주세요.
                </p>
                <RespondMessage>{JSON.stringify(response) + `\n\n----\n\nat: ${at}`}</RespondMessage>
            </>
        )
    ),
});

const ExclamationIcon = styled.div.attrs({
    children: <FontAwesomeIcon icon={faTriangleExclamation} />,
})`
    font-size: 48px;
    color: red;
`;

const Head = styled.h2`
    margin-top: 0;
`;

const Message = styled.div`
    margin: 1em 0;
`;

const RespondMessage = styled.div.attrs(({ children }) => ({
    children: (
        <>
            <button
                onClick={() =>
                    navigator.clipboard
                        .writeText(children)
                        .then(() => alert('복사되었습니다. 개발자에게 전달해주세요.'))
                }
            >
                <FontAwesomeIcon icon={faCopy} />
            </button>
            <pre>{children}</pre>
        </>
    ),
}))`
    padding: 1em;
    border: 1px solid #ccc;
    background-color: #eee;
    overflow-y: scroll;
    position: relative;

    button {
        position: absolute;
        top: 1em;
        right: 1em;
        border: 1px solid #bbb;
        background-color: #ddd;
        height: 2em;
        width: 2em;
        line-height: 1;

        &:hover {
            border: 1px solid #aaa;
            background-color: #ccc;
        }
    }

    pre {
        text-align: left;
        word-break: break-all;
        white-space: pre-wrap;
        max-height: 5em;
        margin: 0;
    }
`;

export const Error = ({ message = ErrorMessage.NonBand, ...args }) => {
    return (
        <>
            <Head>
                <ExclamationIcon />
                <div>{applyArgs(message?.title, args)}</div>
            </Head>
            <Message>{applyArgs(message?.description, args)}</Message>
        </>
    );
};
