package com.nacos.pbl;


public interface EncryptService {
    /**
     * 对字符进行加密
     * @param str
     * @return
     */
    String encrypt(String str) throws Exception;

    /**
     * 对字符进行解密
     * @param str
     * @return
     */
    String decrypt(String str) throws Exception;
}
