package com.nacos.pbl;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "encrypt-service",path = "/encrypt")
public interface EncryptService {
    /**
     * 对字符进行加密
     * @param str
     * @return
     */
    @RequestMapping("/encrypt")
    String encrypt(@RequestParam("str") String str) throws Exception;

    /**
     * 对字符进行解密
     * @param str
     * @return
     */
    @RequestMapping("/decrypt")
    String decrypt(@RequestParam("str") String str) throws Exception;
}
