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
import { Edit2, MoreHorizontal,User2} from 'lucide-react';
import { PopoverContent } from '../ui/popover';
import { useNavigate } from 'react-router-dom';

const JobsTable = ({jobs,loading}) => {
  const navigate = useNavigate();
  return (
    <div className="my-5">
      <Table>
        <TableCaption>
          {loading ? 'Loading companies...' : 'List of your registered companies'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Title</TableHead>
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
          ) : jobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't registered any companies
              </TableCell>
            </TableRow>
          ) : (
            jobs.map((job, index) => (
              <TableRow key={jobs._id || index}>
                <TableCell>
                {job.companyId.name}
                </TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{new Date(job?.createdAt?.slice(0,10)).toLocaleDateString()}</TableCell>
                <TableCell className="">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32  items-center p-2">
                      <div className="flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-gray-100 rounded"
                      onClick={()=>navigate(`/admin/companies/${job._id}`)}>
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div className="flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-gray-100 rounded"
                      onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}>
                        <User2 className="w-4" />
                        <span>Applicants</span>
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

export default JobsTable;
