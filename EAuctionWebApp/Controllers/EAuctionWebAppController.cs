using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EAuctionWebApp.Models;

namespace EAuctionWebApp.Controllers
{
    [RoutePrefix("Api/EAuction")]
    public class EAuctionWebAppController : ApiController
    {
        EAuctionDBEntities objEntity = new EAuctionDBEntities();

        [HttpGet]
        [Route("AllSellerDetails")]
        public IHttpActionResult GetAllSellers()
        {
            try
            {
                var result = (from tblSel in objEntity.tblSellerMasters
                              join tblCountry in objEntity.CountryMasters on tblSel.CountryId equals tblCountry.CountryId
                              join tblState in objEntity.StateMasters on tblSel.StateId equals tblState.StateId
                              join tblCity in objEntity.CityMasters on tblSel.Cityid equals tblCity.Cityid
                              select new
                              {
                                  SellerId = tblSel.SellerId,
                                  FirstName = tblSel.FirstName,
                                  LastName = tblSel.LastName,
                                  DateofBirth = tblSel.DateofBirth,
                                  EmailId = tblSel.EmailId,
                                  Gender = tblSel.Gender,
                                  CountryId = tblSel.CountryId,
                                  StateId = tblSel.StateId,
                                  Cityid = tblSel.Cityid,
                                  Address = tblSel.Address,
                                  Pincode = tblSel.Pincode,
                                  Country = tblCountry.CountryName,
                                  State = tblState.StateName,
                                  City = tblCity.CityName
                              }).ToList();

                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetSellerDetailsById/{sellerId}")]
        public IHttpActionResult GetSellerById(string sellerId)
        {
            try
            {
                tblSellerMaster objSel = new tblSellerMaster();
                int ID = Convert.ToInt32(sellerId);
                try
                {
                    objSel = objEntity.tblSellerMasters.Find(ID);
                    if (objSel == null)
                    {
                        return NotFound();
                    }
                }
                catch (Exception)
                {
                    throw;
                }
                return Ok(objSel);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("AllProductDetails")]
        public IHttpActionResult GetAllProducts()
        {
            try
            {
                var result = (from tblPro in objEntity.tblProductMasters
                              select new
                              {
                                  ProductId = tblPro.ProductId,
                                  ProductName = tblPro.ProductName,
                                  ShortDescription = tblPro.ShortDescription,
                                  DetailedDescription = tblPro.DetailedDescription,
                                  Category = tblPro.Category,
                                  StartingPrice = tblPro.StartingPrice,
                                  BidEndDate = tblPro.BidEndDate
                              }).ToList();

                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("AllBuyerDetails")]
        public IHttpActionResult GetAllBuyers()
        {
            try
            {
                var result = (from tblBuy in objEntity.tblBuyerMasters
                              select new
                              {
                                  BuyerId = tblBuy.BuyerId,
                                  BuyerFirstName = tblBuy.BuyerFirstName,
                                  BuyerLastName = tblBuy.BuyerLastName,
                                  BuyerMobileNo = tblBuy.BuyerMobileNo,
                                  BuyerEmailId = tblBuy.BuyerEmailId,
                                  BuyerAddress = tblBuy.BuyerAddress,
                                  BidAmount = tblBuy.BidAmount,
                                  BuyerCity = tblBuy.BuyerCity,
                                  BuyerPincode = tblBuy.BuyerPincode,
                                  BuyerState = tblBuy.BuyerState,
                                  BuyersProductId =  tblBuy.BuyersProductId
                              }).ToList();

                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetProductDetailsById/{productId}")]
        public IHttpActionResult GetProductById(int productId)
        {
            try
            {
                tblProductMaster objPro = new tblProductMaster();
                int ID = Convert.ToInt32(productId);
                try
                {
                    objPro = objEntity.tblProductMasters.Find(ID);
                    if (objPro == null)
                    {
                        return NotFound();
                    }
                }
                catch (Exception)
                {
                    throw;
                }
                return Ok(objPro);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("InsertSellerDetails")]
        public IHttpActionResult PostSellers(tblSellerMaster data)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                try
                {
                    objEntity.tblSellerMasters.Add(data);
                    objEntity.SaveChanges();
                }
                catch (Exception)
                {
                    throw;
                }
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut]
        [Route("UpdateSellerDetails")]
        public IHttpActionResult PutSellerMaster(tblSellerMaster seller)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                try
                {
                    tblSellerMaster objSel = new tblSellerMaster();
                    objSel = objEntity.tblSellerMasters.Find(seller.SellerId);
                    if (objSel != null)
                    {
                        objSel.FirstName = seller.FirstName;
                        objSel.LastName = seller.LastName;
                        objSel.Address = seller.Address;
                        objSel.EmailId = seller.EmailId;
                        objSel.DateofBirth = seller.DateofBirth.HasValue ? seller.DateofBirth.Value.AddDays(1) : (DateTime?)null;
                        objSel.Gender = seller.Gender;
                        objSel.CountryId = seller.CountryId;
                        objSel.StateId = seller.StateId;
                        objSel.Cityid = seller.Cityid;
                        objSel.Pincode = seller.Pincode;
                    }
                    this.objEntity.SaveChanges();
                }
                catch (Exception)
                {
                    throw;
                }
                return Ok(seller);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpDelete]
        [Route("DeleteSellerDetails")]
        public IHttpActionResult DeleteSellersDetailsDelete(int id)
        {
            try
            {
                tblSellerMaster seller = objEntity.tblSellerMasters.Find(id);
                if (seller == null)
                {
                    return NotFound();
                }
                objEntity.tblSellerMasters.Remove(seller);
                objEntity.SaveChanges();
                return Ok(seller);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpGet]
        [Route("Country")]
        public IQueryable<CountryMaster> GetCountry()
        {
            try
            {
                return objEntity.CountryMasters;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<CountryMaster> CountryData()
        {
            try
            {
                return objEntity.CountryMasters.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("Country/{CountryId}/State")]
        [HttpGet]
        public List<StateMaster> StateData(int CountryId)
        {
            try
            {
                return objEntity.StateMasters.Where(s => s.CountryId == CountryId).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [Route("State/{StateId}/City")]
        [HttpGet]
        public List<CityMaster> CityData(int StateId)
        {
            try
            {
                return objEntity.CityMasters.Where(s => s.StateId == StateId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("DeleteRecord")]
        public IHttpActionResult DeleteRecord(List<tblSellerMaster> user)
        {
            string result = "";
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                result = DeleteData(user);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok(result);
        }
        private string DeleteData(List<tblSellerMaster> users)
        {
            string str = "";
            try
            {
                foreach (var item in users)
                {
                    tblSellerMaster objSel = new tblSellerMaster();
                    objSel.SellerId = item.SellerId;
                    objSel.FirstName = item.FirstName;
                    objSel.LastName = item.LastName;
                    objSel.Address = item.Address;
                    objSel.EmailId = item.EmailId;
                    objSel.DateofBirth = item.DateofBirth.HasValue ? item.DateofBirth.Value.AddDays(1) : (DateTime?)null;
                    objSel.Gender = item.Gender;
                    objSel.CountryId = item.CountryId;
                    objSel.StateId = item.StateId;
                    objSel.Cityid = item.Cityid;
                    objSel.Pincode = item.Pincode;
                    var entry = objEntity.Entry(objSel);
                    if (entry.State == EntityState.Detached) objEntity.tblSellerMasters.Attach(objSel);
                    objEntity.tblSellerMasters.Remove(objSel);
                }
                int i = objEntity.SaveChanges();
                if (i > 0)
                {
                    str = "Records has been deleted";
                }
                else
                {
                    str = "Records deletion has been faild";
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return str;
        }
    }
}
