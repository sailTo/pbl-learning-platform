package com.nacos.entity;

import javax.persistence.Column;
import javax.persistence.Id;

public class Course {
    @Id
    @Column(name = "c_id")
    private Integer c_id;

    @Column(name = "t_id")
    private String t_id;

    @Column(name = "c_name")
    private String c_name;

    private Integer point;

    private Integer status;

    @Column(name = "image_URL")
    private String image_URL;

    private String description;

    /**
     * @return c_id
     */
    public Integer getC_id() {
        return c_id;
    }

    /**
     * @param c_id
     */
    public void setC_id(Integer c_id) {
        this.c_id = c_id;
    }

    /**
     * @return t_id
     */
    public String getT_id() {
        return t_id;
    }

    /**
     * @param t_id
     */
    public void setT_id(String t_id) {
        this.t_id = t_id;
    }

    /**
     * @return c_name
     */
    public String getC_name() {
        return c_name;
    }

    /**
     * @param c_name
     */
    public void setC_name(String c_name) {
        this.c_name = c_name;
    }

    /**
     * @return point
     */
    public Integer getPoint() {
        return point;
    }

    /**
     * @param point
     */
    public void setPoint(Integer point) {
        this.point = point;
    }

    /**
     * @return status
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * @param status
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    /**
     * @return image_URL
     */
    public String getImage_URL() {
        return image_URL;
    }

    /**
     * @param image_URL
     */
    public void setImage_URL(String image_URL) {
        this.image_URL = image_URL;
    }

    /**
     * @return description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }
}