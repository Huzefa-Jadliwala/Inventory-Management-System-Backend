import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productModel: Model<Product>;

  const mockProduct = {
    _id: '6611144689150f29c831e811',
    name: 'Test Product',
    description: 'This is a test product',
    price: 20.23,
  };

  const mockProductService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductService,
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    productModel = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of product', async () => {
      jest.spyOn(productModel, 'find').mockResolvedValue([mockProduct]);

      const result = await productsService.findAll();

      expect(result).toEqual([mockProduct]);
      expect(productModel.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const newProduct = {
        _id: '6611144689150f29c831e811',
        name: 'Test Product',
        description: 'This is a test product',
        price: 20.23,
      };

      jest
        .spyOn(productModel, 'create')
        .mockImplementationOnce(() => Promise.resolve([mockProduct as any]));

      const result = await productsService.create(
        newProduct as CreateProductDto,
      );

      expect(result[0]).toEqual(mockProduct);
    });
  });

  describe('findById', () => {
    it('should find and return a product by ID', async () => {
      jest.spyOn(productModel, 'findById').mockResolvedValue(mockProduct);

      const result = await productsService.findOne(mockProduct._id);

      expect(productModel.findById).toHaveBeenCalledWith(mockProduct._id);
      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException if product is not found', async () => {
      jest.spyOn(productModel, 'findById').mockResolvedValue(null);

      await expect(productsService.findOne(mockProduct._id)).rejects.toThrow(
        NotFoundException,
      );

      expect(productModel.findById).toHaveBeenCalledWith(mockProduct._id);
    });
  });

  describe('update', () => {
    it('should update and return a product', async () => {
      const updatedProduct = { ...mockProduct, name: 'Updated name' };
      const product = { name: 'Updated name' };

      jest
        .spyOn(productModel, 'findByIdAndUpdate')
        .mockResolvedValue(updatedProduct);

      const result = await productsService.update(
        mockProduct._id,
        product as any,
      );

      expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockProduct._id,
        product,
        {
          new: true,
          runValidators: true,
        },
      );

      expect(result.name).toEqual(product.name);
    });
  });

  describe('remove', () => {
    it('should delete and return a product', async () => {
      jest
        .spyOn(productModel, 'findByIdAndDelete')
        .mockResolvedValue(mockProduct);

      const result = await productsService.remove(mockProduct._id);

      expect(productModel.findByIdAndDelete).toHaveBeenCalledWith(
        mockProduct._id,
      );

      expect(result).toEqual(mockProduct);
    });
  });
});
