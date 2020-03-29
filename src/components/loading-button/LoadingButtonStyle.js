import React from 'react';
import styled from 'styled-components';

export const Loader = styled.div`
    @keyframes load {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    border: 4px solid rgba(255, 255, 255, 0.2);
    border-left: 4px solid;
    animation: load 1s infinite linear;
    border-radius: 50%;
    width: 25px;
    height: 25px;
`;

export const StyledBareButton = styled.button`
    border: none;
    padding: 1rem 2rem;
    font-size: 16px;
    color: #ffffff;
    font-weight: 600;
    border-radius: 6px;
    background-color: #2080df;

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    & > span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    &.true {
        background-color: #73b346;
    }

    &.false {
        background-color: #ed0012;
    }
`;

export const CheckBox = styled.div`
    height: 24px;
    width: 12px;

    display: inline-block;
    border: #78b13f;
    transform: rotate(45deg);
    height: var(--height);
    width: var(--width);
    border-bottom: var(--borderWidth) solid var(--borderColor);
    border-right: var(--borderWidth) solid var(--borderColor);
`;
