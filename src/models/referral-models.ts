/** REFERRAL CODE */
export interface IReferralCode{
    address: string,
    code: string,
    address_linked: string,
    code_linked:  string,
    point: number,
    total_earn: number,
    address_referrals: IAddress_Referrals[],
}

export interface IAddress_Referrals{
    address_level_1: string,
    address_level_2: string,
    updated_time_level_1: number,
    updated_time_level_2: number,
}