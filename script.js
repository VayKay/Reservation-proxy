import http from "k6/http";
import { sleep } from "k6";

export let options = {
    stages: [
      { duration: "20s", target: 50  },
      { duration: "20s", target: 50 },
      { duration: "10s", target: 250 },
      { duration: "1m",  target: 550 },
      { duration: "10s", target: 450 },
      { duration: "10s", target: 350 },
      { duration: "10s", target: 250 },
      { duration: "10s", target: 100  },
      { duration: "10s", target: 50   },
      { duration: "20s", target: 0    },
    ],
  }

  export default function() {
    // http.get(`http://localhost:8000/listing/${Math.floor((Math.random() * 10000000) + 1)}`);
    http.post(`http://localhost:8000/listing/post`);
    sleep(1);
  }