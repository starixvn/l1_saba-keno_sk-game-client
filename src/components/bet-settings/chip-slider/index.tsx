import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import useSound from "use-sound";
import Styles from "./chip-slider.module.scss";
import { Chip } from "./chip";
import { useSystemContext } from "../../../contexts/system";

const SlidingTimeInMillisecond = 100;
let isSwipe = true;

export const ChipSlider: React.FC<{
    updateBetValue: Function;
}> = ({ updateBetValue }) => {
    const { betValue, userStakeLevel, chipSettings, enabledPlaySound } = useSystemContext();
    const [enabledPrevBtn, setEnabledPrevBtn] = useState(false);
    const [enabledNextBtn, setEnabledNextBtn] = useState(true);
    const [selectedChip, setSelectedChip] = useState(betValue);
    const [isSliding, setIsSliding] = useState(false);
    let sliderRef = null;
    const [playSound] = useSound("./static/sounds/chip-click.mp3");
    const chipValues = useMemo(() => {
        if (userStakeLevel?.minBet !== undefined && userStakeLevel?.maxBet !== undefined && chipSettings?.chips) {
            const maxBet = Math.min(userStakeLevel.maxBet, chipSettings.maxBet);
            const minBet = Math.max(userStakeLevel.minBet, chipSettings.minBet);
            return chipSettings?.chips?.map((chip) => +chip).filter((value) => value >= minBet && value <= maxBet) || [];
        }
        return [];
    }, [userStakeLevel, chipSettings]);
    const onClickChip = (chipValue: number) => {
        const chipIndex = chipValues.indexOf(chipValue);
        const currentSlideToShow = getCurrentSlidesToShow();
        const currentSlide = sliderRef.innerSlider.state.currentSlide;

        if (chipIndex + 1 - currentSlideToShow >= currentSlide) {
            disableSelectChipWhenSliding();
            isSwipe = false;
            sliderRef.slickGoTo(chipIndex + 2 - currentSlideToShow);
        }

        if (chipIndex - 1 <= currentSlide) {
            disableSelectChipWhenSliding();
            isSwipe = false;
            sliderRef.slickGoTo(chipIndex - 1);
        }
        handleSelectChip(chipValue);
    };

    const handleSelectChip = (chipValue: number) => {
        setSelectedChip(chipValue);
        updateArrowsByChipValue(chipValue);
        updateBetValue(chipValue);
        enabledPlaySound && playSound();
    };

    const getCurrentSlidesToShow = () => {
        const currentBreakPoint = sliderRef.state.breakpoint;
        const sliderResponsiveSettings = sliderRef.props.responsive;
        const currentResponsiveSettings = sliderResponsiveSettings.find((settings) => settings.breakpoint === currentBreakPoint);

        return currentResponsiveSettings?.settings?.slidesToShow ?? sliderRef.props.slidesToShow;
    };

    const updateArrowsByChipValue = (chipValue: number) => {
        const chipIndex = chipValues.indexOf(chipValue);

        chipIndex === 0 ? setEnabledPrevBtn(false) : setEnabledPrevBtn(true);
        chipIndex === chipValues.length - 1 ? setEnabledNextBtn(false) : setEnabledNextBtn(true);
    };

    const disableSelectChipWhenSliding = () => {
        setIsSliding(true);

        const slidingTimeOut = setTimeout(() => {
            setIsSliding(false);
            clearTimeout(slidingTimeOut);
        }, SlidingTimeInMillisecond);
    };

    const onClickNext = () => {
        if (enabledNextBtn && !isSliding) {
            const chipIndex = chipValues.indexOf(selectedChip);
            const newSelectedChip = chipValues[chipIndex + 1];
            const currentSlideToShow = getCurrentSlidesToShow();

            isSwipe = false;
            sliderRef.slickGoTo(chipIndex + 3 - currentSlideToShow);
            handleSelectChip(newSelectedChip);
            disableSelectChipWhenSliding();
        }
    };

    const onClickPrev = () => {
        if (enabledPrevBtn && !isSliding) {
            const chipIndex = chipValues.indexOf(selectedChip);
            const newSelectedChip = chipValues[chipIndex - 1];

            isSwipe = false;
            sliderRef.slickGoTo(chipIndex - 2);
            handleSelectChip(newSelectedChip);
            disableSelectChipWhenSliding();
        }
    };

    useEffect(() => {
        const chip = chipValues.find((chip) => chip === selectedChip) || chipValues?.[0];
        chip > 0 && onClickChip(chip);
        chipValues.length > 0 && updateArrowsByChipValue(selectedChip);
    }, [chipValues]);

    useEffect(() => {
        if (sliderRef) {
            isSwipe = false;
            const chipIndex = chipValues.indexOf(selectedChip);
            sliderRef.slickGoTo(chipIndex);
            updateArrowsByChipValue(selectedChip);
        }
    }, []);

    const SliderSetting = {
        speed: SlidingTimeInMillisecond,
        infinite: false,
        adaptiveHeight: true,
        swipeToSlide: true,
        slidesToShow: 10,
        arrows: false,
        onSwipe: () => {
            isSwipe = true;
        },
        beforeChange: (oldIndex: number, newIndex: number) => {
            if (isSwipe) {
                const currentSlideToShow = getCurrentSlidesToShow();

                oldIndex > newIndex && handleSelectChip(chipValues[newIndex + currentSlideToShow - 1]);
                oldIndex < newIndex && handleSelectChip(chipValues[newIndex]);
            }
        },
        responsive: [
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow: 8,
                },
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 5,
                },
            },
        ],
    };

    const getChipSetting = (value) => {
        return chipSettings.chipColors?.find((c) => c.value === value);
    };

    return (
        chipValues.length > 0 && (
            <React.Fragment>
                <span
                    className={`${Styles["icon-prev"]} ${Styles["quick-bet"]} ${!enabledPrevBtn && Styles["disabled"]}`}
                    onClick={onClickPrev}
                ></span>
                <Slider
                    ref={(c) => {
                        sliderRef = c;
                    }}
                    {...SliderSetting}
                >
                    {chipValues.map((value) => (
                        <Chip
                            key={value}
                            value={value}
                            text={getChipSetting(value)?.text}
                            color={getChipSetting(value)?.color}
                            selectedChip={selectedChip}
                            onClickChip={onClickChip}
                        />
                    ))}
                </Slider>
                <span
                    className={`${Styles["icon-next"]} ${Styles["quick-bet"]} ${!enabledNextBtn && Styles["disabled"]}`}
                    onClick={onClickNext}
                ></span>
            </React.Fragment>
        )
    );
};
