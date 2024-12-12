export interface Props {
    enabledSound: boolean;
    enabledNotification: boolean;
    onToggleSound: Function;
    onToggleNotification: Function;
    toggleGuideModal: Function;
    toggleHistoryModal: Function;
    toggleAnnouncementModal: Function;
    isShowBoostedOdds: boolean;
    promotionNotifications: [];
    isShowToolbarGuide: boolean;
}
