package com.example.maxim_pj.mapper;

import com.example.maxim_pj.vos.ProductVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MainMapper {
    List<ProductVO> get_all_product();
}
