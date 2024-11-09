import fs from 'fs';
import path from 'path';

const districts = path.join(__dirname, `../json/districts.json`);
const provinces = path.join(__dirname, `../json/provinces.json`);
const wards = path.join(__dirname, `../json/wards.json`);

const getProvinces = async (req, res, next) => {
    try {
        const data = fs.readFileSync(provinces, 'utf8');
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        next(error);
    }
};

const getDistricts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = fs.readFileSync(districts, 'utf8');
        const districtsData = JSON.parse(data);
        const filteredDistricts = districtsData.filter(district => district.province_code === parseInt(id));
        res.status(200).json(filteredDistricts);
    } catch (error) {
        next(error);
    }
};

const getWards = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = fs.readFileSync(wards, 'utf8');
        const wardsDataData = JSON.parse(data);
        const filteredWars = wardsDataData.filter(ward => ward.district_code === parseInt(id));
        res.status(200).json(filteredWars);
    } catch (error) {
        next(error);
    }
};

export const provincesController = {
    getProvinces,
    getDistricts,
    getWards
}