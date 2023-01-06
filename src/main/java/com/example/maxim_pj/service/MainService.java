package com.example.maxim_pj.service;

import com.example.maxim_pj.mapper.MainMapper;
import com.example.maxim_pj.vos.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainService {
    @Autowired
    private MainMapper mainMapper;

    public List<ProductVO>  get_all_product(){return mainMapper.get_all_product();}
}
