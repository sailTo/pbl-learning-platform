package com.nacos.entity;

import javax.persistence.Column;
import javax.persistence.Id;

public class User {
    @Id
    @Column(name = "u_id")
    private String u_id;

    private String type;

    @Column(name = "u_name")
    private String u_name;

    private String gender;

    private String password;

    private String image;

    private Boolean status;

    private String description;

    /**
     * @return u_id
     */
    public String getU_id() {
        return u_id;
    }

    /**
     * @param u_id
     */
    public void setU_id(String u_id) {
        this.u_id = u_id;
    }

    /**
     * @return type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return u_name
     */
    public String getU_name() {
        return u_name;
    }

    /**
     * @param u_name
     */
    public void setU_name(String u_name) {
        this.u_name = u_name;
    }

    /**
     * @return gender
     */
    public String getGender() {
        return gender;
    }

    /**
     * @param gender
     */
    public void setGender(String gender) {
        this.gender = gender;
    }

    /**
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return image
     */
    public String getImage() {
        return image;
    }

    /**
     * @param image
     */
    public void setImage(String image) {
        this.image = image;
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

    /**
     * @return status
     */
    public Boolean getStatus() {
        return status;
    }

    /**
     * @param status
     */
    public void setStatus(Boolean status) {
        this.status = status;
    }
}