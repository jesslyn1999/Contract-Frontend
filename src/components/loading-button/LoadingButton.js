import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Loader, StyledBareButton } from './LoadingButtonStyle';

const NiceButton = ({ onClick, children, ...props }) => {
    /* Capture the dimensions of the button before the loading happens
    so it doesn’t change size when showing the loader */
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [showLoader, setShowLoader] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [processResult, setProcessResult] = useState(null);
    const [startLoadingTime, setStartLoadingTime] = useState();
    const parentCallback = onClick;
    const ref = useRef(null);

    // Save the dimensions here
    useEffect(
        () => {
            if (ref.current && ref.current.getBoundingClientRect().width) {
                setWidth(ref.current.getBoundingClientRect().width);
            }
            if (ref.current && ref.current.getBoundingClientRect().height) {
                setHeight(ref.current.getBoundingClientRect().height);
            }
        },
        // children are a dep so dimensions are updated if initial contents change
        [children],
    );

    useEffect(() => {
        if (isLoading) {
            setShowLoader(true);
            setStartLoadingTime(new Date());
        }

        // Show loader a bits longer to avoid loading flash
        if (!isLoading && showLoader) {
            let processingTime = new Date() - startLoadingTime;

            setTimeout(() => {
                // ilangin show loader
                setShowLoader(false);

                setTimeout(() => {
                    setProcessResult(null);
                }, 1000);
            }, Math.max(0, 800 - processingTime));
        }
    }, [isLoading, showLoader]);

    useEffect(() => {
        setIsLoading(false);
    }, [processResult]);

    const fadeOutProps = useSpring({ opacity: showLoader ? 1 : 0 });
    const fadeInProps = useSpring({ opacity: showLoader ? 0 : 1 });

    return (
        <StyledBareButton
            className={!showLoader && !isLoading ? `${processResult}` : ''}
            {...props}
            onClick={() => {
                setIsLoading(true);
                parentCallback()
                    .then(() => {
                        setProcessResult(true);
                    })
                    .catch(() => {
                        setProcessResult(false);
                    });
            }}
            ref={ref}
            style={
                showLoader || processResult !== null
                    ? {
                          width: `${width}px`,
                          height: `${height}px`,
                      }
                    : {}
            }
        >
            {showLoader ? (
                <animated.div style={fadeOutProps}>
                    <Loader />
                </animated.div>
            ) : processResult === true ? (
                <animated.div style={fadeInProps}>SUCCESS!</animated.div>
            ) : processResult === false ? (
                <animated.div style={fadeInProps}>FAIL!</animated.div>
            ) : (
                <animated.div style={fadeInProps}>{children}</animated.div>
            )}
        </StyledBareButton>
    );
};

export default NiceButton;
