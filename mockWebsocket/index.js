const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3006;
const moment = require('moment');

const alerts = [
  {
    id: 1,
    message:
      'Forno da picanha atingiu 150kWh no periodo de 12/06/2018~20/06/2018',
    date: '2018-06-20T14:00:00',
    branch: {
      tradename: 'Outback - Paulista',
      id: 1,
    },
  },
  {
    id: 2,
    message:
      'Aquecedor de ar atingiu 400kWh de potência em 20/06/2018 15:00:01',
    date: '2018-06-20T15:00:01',
    branch: {
      tradename: 'Outback - Alphaville',
      id: 2,
    },
  },
];

io.of('/alert').on('connect', (socket) => {
  console.log(`The user ${socket.id} enter in /alert`);
  setInterval(() => {
    const alertId = alerts.length + 1;
    alerts.unshift({
      id: alertId,
      message: `Refrigerador de picanha ${alertId} Atingiu 12MWh de potência em ${moment().format('DD/MM/YYYY HH:mm:ss')}`,
      date: moment().format('YYYY-MM-DD[T]HH:mm:ss'),
      branch: {
        tradename: 'Outback - Paulista',
        id: 1,
      },
    });
    socket.emit('pendingAlerts', alerts);
  }, 15000);
});

const getRandomValueDecimal = (min, max) => {
  const value = Math.random() * (max - min) + min;
  return value.toFixed(2);
};

const getRandomValueInt = (min, max) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue)) + min;
};

function getRandomFlag() {
  const flags = [
    'Bandeira Amarela',
    'Bandeira Verde',
    'Bandeira Vermelha P1',
    'Bandeira Vermelha P2',
  ];
  return flags[Math.floor(Math.random() * flags.length)];
}

io.of('/dashboard').on('connect', (socket) => {
  io.use((socketValidate, next) => {
    const { searchBranchId, month, year } = socketValidate.handshake.query;
    console.log(searchBranchId, month, year);
    next();
  });
  console.log(`The user ${socket.id} enter in /dashboard`);
  setInterval(() => {
    socket.emit('listDashboard', {
      financialSummary: {
        value: getRandomValueDecimal(30.2, 204.21),
        unit: 'R$',
        percentageComparedToPrevioustMonth: -0.1,
      },
      consumptionTrendPercentageComparedToPreviousMonth: getRandomValueDecimal(
        -0.1,
        0.9
      ),
      fareFlag: getRandomFlag(),
      higherConsumptionEgg: {
        id: 123,
        name: 'Egg tararan',
        cost: getRandomValueDecimal(30, 234),
        unit: 'R$',
      },
      powerDemand: {
        value: getRandomValueDecimal(100, 500),
        unit: 'kW',
      },
      metersActive: {
        active: getRandomValueInt(10, 20),
        total: 20,
      },
      isProductiveHour: true,
      isRushHour: false,
      consumption: {
        value: getRandomValueDecimal(500, 1000),
        unit: 'kWh',
      },
      carbonDioxideEmitted: {
        value: getRandomValueDecimal(350, 800),
        unit: 'kg',
      },
    });
  }, 1000);
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
