import JSEncrypt from 'jsencrypt'

const public_key = '-----BEGIN PUBLIC KEY-----\
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqNZd9PRmKuh9pOlkqThr\
89tu7gHhphz3ne1cnJcW4F7pXXZMQYusL/hgX8kVf2PNiLDyvZkSwfyh9mO3h3au\
4DgUiy+HsHLMMXIjSufNLmBK7TuusluKpgRJf0PEA0aE4P0Huj3RSp+wzU/uWcuk\
AkP7nogonuk67Gl+Dx0aLRL9erLPlchcIjUffXZvF2qNQoYGoIrwr6/aLYV1U0AZ\
ZJONBdpRh0v1mqbAlUGVpH7YcQL3HVn5RDKjhnZiMs86x3zBCVnb0zNo4w8Hed2w\
+jftlYq7wWh+Dy8o88D/dZAQ4GnUQgeLaSTDt1cRcUiZpkmup7ig1szvyo+JXoWf\
B7GVVNMikV7J8EcIVRPiuzKoFJHXRGGJbQDJqhV8lzzwU2ZDZfbQE4zHXmUr07iP\
ddf760yGwN8xdvxRcxsTj5QeLbrYOzrxI6Hp+bPxbgbU+i4FZRzTWx9j8gnNvAAL\
E4K+qMTPX8TM+daz2jNs+AgMAD0OayywcgMQHajowKR+3mo3dS0YbOYI2f0F+ExL\
gNv/TEq26d5jxrP4++vOPqhcSI1k4+x5E6+Fx1V/fZO7/TFc5oj3eYD6jGUF74+0\
VEYuLab8YUmQWRfEhKukXIxQBg/XMJaado4f5mP2sF4wO8mGZgoSECt44CkQDBec\
DBRwi9FWD7Uqv6iR4KpqWncCAwEAAQ==\
-----END PUBLIC KEY-----'

var encrypt = new JSEncrypt();
encrypt.setPublicKey(public_key);

export function encryptStr(str) {
    return encrypt.encrypt(str);
}