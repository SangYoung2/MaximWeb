package com.example.maxim_pj;

import com.example.maxim_pj.service.MainService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MaximPjApplicationTests {
    @Autowired
    MainService mainService;


    @Test
    void contextLoads() {
        mainService.get_all_product();
    }

}
