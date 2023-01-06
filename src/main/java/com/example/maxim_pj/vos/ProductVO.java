package com.example.maxim_pj.vos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductVO {
    int no;
    String brand_name;
    String product_name;
    String product_intro;
}
