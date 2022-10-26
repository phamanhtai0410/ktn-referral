/**
 * * Common
 */
export const ROUTE = 'dapp'

/**
 * * User
 * GET: https://api-stag-ktn.esollabs.com/v1/dapp/user?address={_address}
 * POST: https://api-stag-ktn.esollabs.com/v1/dapp/user
 */
export const MODEL = 'user'
export const GET_MESSAGE = `${ROUTE}/${MODEL}` // [GET] Get a message
export const VERIFY_SIGN = `${ROUTE}/${MODEL}` // [POST] Verify signature

/**
 * * Staking
 */
export const LEADER_BOARD_LIST_ITEMS = `${ROUTE}/leader_board`
export const TOTAL_STAKED = `${ROUTE}/event`
export const EXCHANGE_INFO = `${ROUTE}/exchange`
/**
 * * My Nft
 * GET: https://api-stag-ktn.esollabs.com/v1/nft/my_nfts?address={_address}
 */
export const ROUTE_NFT = 'nft'
export const GET_LIST_MY_NFTS = `${ROUTE_NFT}/my_nfts` // [GET] Get list my nfts

/**
 * * Referral Code
 * GET: https://api-stag-ktn.esollabs.com/v1/nft/my_nfts?address={_address}
 */
const MODEL_REFERRAL = 'referral'
export const GET_REFERRAL_CODE = `${ROUTE}/${MODEL_REFERRAL}` // [GET] Get list my nfts
export const VALIDATE_REFERRAL_CODE = `${ROUTE}/${MODEL_REFERRAL}/validate` // [GET] Submit referral code
export const SUBMIT_REFERRAL_CODE = `${ROUTE}/${MODEL_REFERRAL}` // [GET] Submit referral code
