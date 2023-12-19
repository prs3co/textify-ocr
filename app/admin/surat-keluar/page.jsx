
import React from 'react'
import tableDataComplex from '@/components/admin/outgoingMail/variables/tableDataComplex';
import ComplexTable from '@/components/admin/outgoingMail/components/ComplexTable';

const OutcomingMail = () => {
  return (
    <div>
      <div className="mt-5 h-full gap-5 md:grid-cols-2">
        <ComplexTable tableData={tableDataComplex} />
      </div>
    </div>
  )
}

export default OutcomingMail;


