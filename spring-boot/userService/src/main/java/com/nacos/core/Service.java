package com.nacos.core;

import java.util.List;
import org.apache.ibatis.exceptions.TooManyResultsException;
import tk.mybatis.mapper.entity.Condition;

/**
 * Service 层 基础接口，其他Service 接口 请继承该接口
 */

public interface Service<T> {
    void save(T model);//持久化
    void save(List<T> models);//批量持久化
    void deleteById(Integer id);//通过主鍵刪除
    void deleteById(String id);//通过主鍵刪除
    void update(T model);//更新
    T findById(Integer id);//通过ID查找
    T findById(String id);//通过ID查找
    T findBy(String fieldName, Object value) throws TooManyResultsException; //通过Model中某个成员变量名称（非数据表中column的名称）查找,value需符合unique约束
    List<T> findByCondition(Condition condition);//根据条件查找
    List<T> findAll();//获取所有
}
