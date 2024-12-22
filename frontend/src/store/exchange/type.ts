export interface ExchangeState {
    params: {
      from: string;
      to: string;
      timestamp: number | string;
    };
    result: number | null;
    setFrom: (by: string) => void;
    setTo: (by: string) => void;
    setTimeStamp: (by: string) => void;
    setResult: (by: number) => void;
  }