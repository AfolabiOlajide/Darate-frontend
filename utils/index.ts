


// types

export interface ComponentProps {
    children?: React.ReactNode,
}

export interface CreatorCampignProp {
    owner: string,
    name?: string,
    description: string,
    amountCollected: string,
    image: string,
    pId: number,
    handleClick?: () => void
}

export type NormalCampaignProp = CreatorCampignProp & {
    category: string,
    title: string,
    target: string,
    deadline: number,
}








// Helper functions

export const daysLeft = (deadline: number) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);

    return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage;
};

export const checkIfImage = (url: string, callback: (bool: boolean) => Promise<void>) => {
    const img = new Image();
    img.src = url;

    if (img.complete) callback(true);

    img.onload = () => callback(true);
    img.onerror = () => callback(false);
};
