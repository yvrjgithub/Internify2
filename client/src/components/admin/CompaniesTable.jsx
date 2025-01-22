import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { PopoverContent } from '../ui/popover';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = ({companies,loading}) => {
  const navigate = useNavigate();
  return (
    <div className="my-5">
      <Table>
        <TableCaption>
          {loading ? 'Loading companies...' : 'List of your registered companies'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't registered any companies
              </TableCell>
            </TableRow>
          ) : (
            companies.map((company, index) => (
              <TableRow key={company._id || index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={
                        company.logo ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwwW8C0IYUvX51aTf3ncUAFtD8huxFSvzRAQ&s'
                      }
                      className="w-16"
                      alt={company.name}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{new Date(company.date).toLocaleDateString()}</TableCell>
                <TableCell className="">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 flex items-center">
                      <div className="flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-gray-100 rounded"
                      onClick={()=>navigate(`/admin/companies/${company._id}`)}>
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
