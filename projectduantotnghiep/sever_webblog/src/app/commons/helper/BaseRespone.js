class BaseResponse {
    constructor({ statusCode, data }) {
      this.statusCode = statusCode;
      //copy data to this.BaseResponse
      Object.assign(this, data);
    }
    addMeta(meta) {
      Object.assign(this, meta);
      return this;
    }
    return(res) {
      res.status(this.statusCode).json(this);
  //     res.cookie('AT', at, {
  //       expires: new Date(Date.now() + 18000),                                    
  //       httpOnly: true,
  //       signed: true
  //   })
  //   res.cookie('RT', rt, {
  //     expires: new Date(Date.now() + 180000000),                                    
  //     httpOnly: true,
  //     signed: true
  // })
    }
  }
export default BaseResponse;