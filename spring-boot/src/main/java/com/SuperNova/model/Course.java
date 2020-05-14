package com.SuperNova.model;

import javax.persistence.*;

public class Course {
    @Id
    @Column(name = "c_id")
    private Integer cId;

    @Column(name = "t_id")
    private String tId;

    @Column(name = "c_name")
    private String cName;

    private Integer point;

    private Integer status;

    @Column(name = "image_URL")
    private String imageUrl;

    private String description;

    /**
     * @return c_id
     */
    public Integer getcId() {
        return cId;
    }

    /**
     * @param cId
     */
    public void setcId(Integer cId) {
        this.cId = cId;
    }

    /**
     * @return t_id
     */
    public String gettId() {
        return tId;
    }

    /**
     * @param tId
     */
    public void settId(String tId) {
        this.tId = tId;
    }

    /**
     * @return c_name
     */
    public String getcName() {
        return cName;
    }

    /**
     * @param cName
     */
    public void setcName(String cName) {
        this.cName = cName;
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
    public String getImageUrl() {
        return imageUrl;
    }

    /**
     * @param imageUrl
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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