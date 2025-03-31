import bcrypt from 'bcrypt';
import User from '../models/userModel';
import { userSchema } from '../validators/userValidation';

export const createUser = async (userData: any) => {
    const validatedData = userSchema.parse(userData);
    validatedData.password = await bcrypt.hash(validatedData.password, 10);
    const newUser = new User(validatedData);
    return await newUser.save();
};

export const getAllUsers = async () => {
    return await User.find().select('-password');
};

export const getUserById = async (userId: string) => {
    return await User.findById(userId).select('-password');
};

export const updateUser = async (userId: string, userData: any) => {
    const validatedData = userSchema.parse(userData);
    if (validatedData.password) {
        validatedData.password = await bcrypt.hash(validatedData.password, 10);
    }
    return await User.findByIdAndUpdate(userId, validatedData, { new: true, runValidators: true }).select('-password');;
};

export const deleteUserById = async (userId: string) => {
    return await User.findByIdAndDelete(userId);
};
