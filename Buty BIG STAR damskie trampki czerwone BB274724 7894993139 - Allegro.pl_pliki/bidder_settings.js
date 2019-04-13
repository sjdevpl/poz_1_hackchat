(function(window){
    var pbjsData = {
        bidderSettings: {
            smartadserver: {
                bidCpmAdjustment: function(bidCPM) {
                    return (bidCPM * 0.89) * 4.30;
                }
            },
            sovrn: {
                bidCpmAdjustment: function(bidCPM) {
                    return (bidCPM * 1) * 3.80;
                }
            },
            appnexus: {
                bidCpmAdjustment: function(bidCPM) {
                    return (bidCPM * 1) * 3.80;
                }
            }
        },
        prebidConfig: {
            userSync: {
                filterSettings: {
                            image: {
                            bidders: '*',
                            filter: 'include'
                                    }
                                }
                        },
            bidderSequence: 'random',
            enableSendAllBids: false,
            priceGranularity: {
                buckets:[
                        {
                            "precision": 2,
                            "min": 0,
                            "max": 15.01,
                            "increment": 0.01
                        },
                        {
                            "precision": 2,
                            "min": 15.02,
                            "max": 30.04,
                            "increment": 0.02
                        },
                        {
                            "precision": 2,
                            "min": 30.05,
                            "max": 52.50,
                            "increment": 0.05
                        },
                        {
                            "precision": 2,
                            "min": 53,
                            "max": 165,
                            "increment": 1.00
                        },
                        {
                            "precision": 0,
                            "min": 170,
                            "max": 300,
                            "increment": 10
                        }
                ]
            }
        }
    };

    window.pbjsData = pbjsData;
})(window);