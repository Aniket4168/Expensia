"use clinet"

import { scanRecipt } from '@/actions/transaction';
import useFetch from '@/hooks/use-fetch';
import { Button } from '@react-email/components';
import { Camera, Loader2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import { toast } from 'sonner';

const ReceiptScanner = ({onScanComplete}) => {

    const fileInputRef = useRef();

    const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanRecipt);

  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    await scanReceiptFn(file);
  };

  useEffect(() => {
    if (scannedData && !scanReceiptLoading) {
      onScanComplete(scannedData);
      toast.success("Receipt scanned successfully");
    }
  }, [scanReceiptLoading, scannedData]);

  return (
    <div className="flex items-center gap-4 rounded-md"> 
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full rounded-md h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white"
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
      >
        {scanReceiptLoading ? (
          <div className='flex items-center pt-2 pl-5'>
            <Loader2 className="mr-2 animate-spin" />
            <span>Scanning Receipt...</span>
          </div>
        ) : (
          <div className='flex items-center pt-2 pl-5'>
            <Camera className="mr-2" />
            <span>Scan Receipt with AI</span>
          </div>
        )}
      </Button>
    </div>
  )
}

export default ReceiptScanner