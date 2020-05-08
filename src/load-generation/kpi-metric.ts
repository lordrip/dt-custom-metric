import { HttpClient } from '../rest';
import { ApiUrl } from 'config';

const getCustomDeviceDataPoint = (value: number) => {
  const date = new Date();

  return {
    displayName: "coffeeMachine",
    group: "myCustomDeviceGroup",
    type: "KPI",
    properties: {},
    series: [
      {
        timeseriesId: "custom:msrkpi",
        dimensions: {
          'storage-consumption': "Linz"
        },
        dataPoints: [
          [
            date.getTime(),
            value
          ]
        ]
      }
    ]
  };
};

export const publishMetric = async (value: number) => HttpClient.post(ApiUrl.CustomDevice, getCustomDeviceDataPoint(value));
