package com.nacos.entity;

import javax.persistence.Column;
import javax.persistence.Id;

public class File {

    @Id
    @Column(name = "f_id")
    private Integer f_id;

    @Id
    @Column(name = "p_id")
    private Integer p_id;

    @Column(name = "u_id")
    private String u_id;

    @Column(name = "f_name")
    private String f_name;

    @Column(name = "file_URL")
    private String file_URL;

    private String description;

    /**
     * @return f_id
     */
    public Integer getF_id() {
        return f_id;
    }

    /**
     * @param f_id
     */
    public void setF_id(Integer f_id) {
        this.f_id = f_id;
    }

    /**
     * @return p_id
     */
    public Integer getP_id() {
        return p_id;
    }

    /**
     * @param p_id
     */
    public void setP_id(Integer p_id) {
        this.p_id = p_id;
    }

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
     * @return f_name
     */
    public String getF_name() {
        return f_name;
    }

    /**
     * @param f_name
     */
    public void setF_name(String f_name) {
        this.f_name = f_name;
    }

    /**
     * @return file_URL
     */
    public String getFile_URL() {
        return file_URL;
    }

    /**
     * @param file_URL
     */
    public void setFile_URL(String file_URL) {
        this.file_URL = file_URL;
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