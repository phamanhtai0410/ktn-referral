export const storageConstants = {
  account:"_acc",
  accessToken: "accessToken",
  dataGoogle: "dataGoogle",
  refreshToken: "refreshToken",
};

export const LocalStorageService = (function () {
  var _service;

  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  function _setToken(tokenData) {
    if (tokenData) {
      localStorage.setItem(storageConstants.accessToken, tokenData.access_token);
    }
  }

  function _getAccessToken() {
    return localStorage.getItem(storageConstants.accessToken);
  }

  function _setAccount(address) {
    if (address) {
      localStorage.setItem(storageConstants.account,address);
    }
  }

  function _getAccessAccount() {
    return localStorage.getItem(storageConstants.account);
  }

  function _getRefreshToken() {
    return localStorage.getItem(storageConstants.refreshToken);
  }

  function _clearToken() {
    localStorage.removeItem(storageConstants.accessToken);
    localStorage.removeItem(storageConstants.dataGoogle);
    localStorage.removeItem(storageConstants.refreshToken);
  }

  function _setDataGoogle(data) {
    if (data) {
      localStorage.setItem(storageConstants.dataGoogle, JSON.stringify(data));
    }
  }

  function _getDataGoogle() {
    return localStorage.getItem(storageConstants.dataGoogle);
  }

  return {
    getService: _getService,
    setToken: _setToken,
    setAccount: _setAccount,
    getAccessToken: _getAccessToken,
    getAccessAccount: _getAccessAccount,
    setDataGoogle: _setDataGoogle,
    getDataGoogle: _getDataGoogle,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();
