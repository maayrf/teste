export const REMOVE_METER_NETWORK = 'MeterNetworkForm/REMOVE_METER_NETWORK';
export const REMOVE_METER_NETWORK_SUCCESS =
  'MeterNetworkForm/REMOVE_METER_NETWORK_SUCCESS';
export const REMOVE_METER_NETWORK_ERROR =
  'MeterNetworkForm/REMOVE_METER_NETWORK_ERROR';

export const CREATE_METER_NETWORK = 'MeterNetworkForm/CREATE_METER_NETWORK';
export const CREATE_METER_NETWORK_ERROR =
  'MeterNetworkForm/CREATE_METER_NETWORK_ERROR';
export const CREATE_METER_NETWORK_SUCCESS =
  'MeterNetworkForm/CREATE_METER_NETWORK_SUCCESS';

export const EDIT_METER_NETWORK = 'MeterNetworkForm/EDIT_METER_NETWORK';
export const EDIT_METER_NETWORK_ERROR =
  'MeterNetworkForm/EDIT_METER_NETWORK_ERROR';
export const EDIT_METER_NETWORK_SUCCESS =
  'MeterNetworkForm/EDIT_METER_NETWORK_SUCCESS';

export const NONE = 'NONE';

// KEY SECURIY_PROTOCOLS
export const WEP = 'WEP';
export const WPA_WPA2_FT_PSK = 'WPA/WPA2/FT_PSK';
export const ENTERPRISE = 'ENTERPRISE';

// KEY OF EPA_METHODS
export const PEAP = 'PEAP';
export const TLS = 'TLS';
export const TTLS = 'TTLS';
export const PWD = 'PWD';
export const SIM = 'SIM';
export const AKA = 'AKA';
export const FAST = 'FAST';
export const LEAP = 'LEAP';

// KEY OF PHASE_TWO_AUTHENTICATIONS
export const MSCHAPV2 = 'MSCHAPV2';
export const GTC = 'GTC';
export const PAP = 'PAP';
export const MSCHAP = 'MSCHAP';

export const SECURITY_PROTOCOLS = [
  {
    key: NONE,
    label: 'Nenhum',
  },
  {
    key: WEP,
    label: 'WEP',
  },
  {
    key: WPA_WPA2_FT_PSK,
    label: 'WPA/WPA2/FT PSK',
  },
  {
    key: ENTERPRISE,
    label: '802.1x EPA (enterprise)',
  },
];

export const EPA_METHODS = [
  {
    key: PEAP,
    label: 'PEAP',
  },
  {
    key: TLS,
    label: 'TLS',
  },
  {
    key: TTLS,
    label: 'TTLS',
  },
  {
    key: PWD,
    label: 'PWD',
  },
  {
    key: SIM,
    label: 'SIM',
  },
  {
    key: AKA,
    label: 'AKA',
  },
  {
    key: FAST,
    label: 'FAST',
  },
  {
    key: LEAP,
    label: 'LEAP',
  },
];

export const PHASE_TWO_AUTHENTICATIONS = [
  {
    key: NONE,
    label: 'Nenhum',
  },
  {
    key: MSCHAPV2,
    label: 'MSCHAPV2',
  },
  {
    key: GTC,
    label: 'GTC',
  },
];

export const TTLS_PHASE_TWO_AUTHENTICATIONS = [
  ...PHASE_TWO_AUTHENTICATIONS,
  {
    key: PAP,
    label: 'PAP',
  },
  {
    key: MSCHAP,
    label: 'MSCHAP',
  },
];

export const PHASE_TWO_AUTHENTICATIONS_OPTIONS = {
  [PEAP]: PHASE_TWO_AUTHENTICATIONS,
  [TTLS]: TTLS_PHASE_TWO_AUTHENTICATIONS,
  [FAST]: PHASE_TWO_AUTHENTICATIONS,
};

export const PROVISIONS = [
  {
    key: '0',
    label: '0',
  },
  {
    key: '1',
    label: '1',
  },
  {
    key: '2',
    label: '2',
  },
  {
    key: '3',
    label: '3',
  },
];

export const CAN_SEE_PHASE_TWO_AUTHENTICATIONS = {
  PEAP,
  TTLS,
  FAST,
};

export const CAN_SEE_PASSWORD = {
  PEAP,
  TTLS,
  PWD,
  FAST,
  LEAP,
};

export const CAN_SEE_IDENTITY = {
  PEAP,
  TLS,
  TTLS,
  PWD,
  FAST,
  LEAP,
};

export const CAN_SEE_IDENTITY_ANONYMOUS = { PEAP, TTLS };

export const CAN_SEE_PROVISIONING = { FAST };

export const CAN_SEE_CERTIFICATE_CA = {
  PEAP,
  TLS,
  TTLS,
  FAST,
};

export const VALID_TYPE_FILE_CERTIFICATE_CA = ['application/x-x509-ca-cert'];
