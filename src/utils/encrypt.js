const public_key = '-----BEGIN PUBLIC KEY-----\
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApawH3ARQbMfoX8xzHMqj\
JazO4eZh1PPXYH+NU4B/DMEJN2ZKLz9qIlhTWddHLg6PavqpUMHo1taZYOaTbt98\
c/xVzMDVZ1F6+JhnZZPeevCEk+LafEPQ58n7YCjuetygKmja4N35H1tC1sxdpsO6\
RHswibNjn7WDsensEoJ40BxtG4n4zsRzNi9hOFupF+QuXsfj4CWlBRxbNP/WIQnS\
UHKrX6bLyaMDkCEetvz1JlxBHVPo9Hudu4vkXUPF1M77ze7Y6t9Hf5kY0jMJZKv8\
YVq5cXtH/e8hEVfwsSEfBI1wvd0z3lBwnCrjvYB5D/r/Xl0hU1+9IZGyNdkySpzg\
LQIDAQAB\
-----END PUBLIC KEY-----'

var encrypt = new JSEncrypt();
encrypt.setPublicKey(public_key);

export function encrypt(str) {
    return encrypt.encrypt(str);
}